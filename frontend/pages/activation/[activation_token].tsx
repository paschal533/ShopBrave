import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../../server";
import { toast } from "react-toastify";
import { CreatedSuccess } from "@/components";

const ActivationPage = () => {
  const router = useRouter();
  const { activation_token } = router.query;
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            setError(true);
            toast.error(err.response.data.message);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <CreatedSuccess
          title="Account creation failed"
          text="Your token is expired!"
        />
      ) : (
        <CreatedSuccess
          title="Congratulations"
          text="Your account has been created suceessfully! Proceed to login"
        />
      )}
    </div>
  );
};

export default ActivationPage;
