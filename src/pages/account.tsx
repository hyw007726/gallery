import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/pages/Account.module.css";
import uploadProfile from "@/services/uploadProfile";
import Image from "next/image";
import { message, Skeleton } from "antd";
import { Card, Space } from "antd";
import AuthContext from "@/components/context/AuthContext";
import { userModel } from "@/types/userModel";

function Account() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [avatarPath, setAvatarPath] = useState<string>("");
  const [nickname, setNickname] = useState(currentUser?.nickname ?? "");
  if (!currentUser) {
    return <div className={styles.noImages}>Please login first</div>;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!currentUser || !currentUser.id) {
      message.error("Please login first");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", nickname);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const newProfile: userModel = await uploadProfile(currentUser.id, formData);
    if (newProfile && newProfile.avatarPath) {
      setAvatarPath(newProfile.avatarPath);
      message.success("Profile updated");
      setCurrentUser(newProfile);
    }
  };

  return (
    <div className={styles.account}>
      <div className={styles.side}>
        <div className={styles.sideContent}>Profile</div>
      </div>
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <Space
            direction="vertical"
            size="middle"
            style={{ display: "flex", width: "100%" }}
          >
            <Card title="Nickname:" size="small">
              <div className={styles.formGroup}>
                <input
                  style={{ paddingLeft: "0.5em" }}
                  onChange={(event) => setNickname(event.target.value)}
                  value={nickname}
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                />
              </div>
            </Card>
          </Space>
          <Space
            direction="vertical"
            size="middle"
            style={{ display: "flex", width: "100%" }}
          >
            <Card title="Avatar:" size="small">
              {currentUser?.avatarPath || avatarPath ? (
                <Image
                  alt="avatar"
                  width={50}
                  height={50}
                  src={
                    avatarPath ||
                    (currentUser && currentUser.avatarPath
                      ? currentUser.avatarPath
                      : "")
                  }
                ></Image>
              ) : (
                <Skeleton.Image />
              )}

              <div className={styles.formGroup}>
                <input
                  onChange={(event) => {
                    setAvatar(
                      event.target.files ? event.target.files[0] : null
                    );
                    setAvatarPath(
                      event.target.files
                        ? URL.createObjectURL(event.target.files[0])
                        : ""
                    );
                  }}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </Card>
          </Space>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Account;
