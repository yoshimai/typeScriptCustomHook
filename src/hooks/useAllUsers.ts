import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { User } from "../types/api/User";

// 全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoding(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoding(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};
