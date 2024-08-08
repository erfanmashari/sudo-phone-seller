"use client";

import Input from "@/components/Form/Input";
import PasswordInput from "@/components/Form/PasswordInput";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

import axiosApp from "@/utils/axiosApp.util";
import {
  checkFetchResponse,
  toastAlert,
  getTokenFromCookie,
} from "@/functions";

const Login = () => {
  const router = useRouter();

  const [formFields, setFormFields] = useState({
    seller: "",
    password: "",
  });

  // change form fields values
  const changeFormFields = (parameter: string, value: string) => {
    const newFormFields: any = { ...formFields };
    newFormFields[parameter] = value;
    setFormFields(newFormFields);
  };

  // send login request to backend
  const sendLoginRequest = (e: FormEvent) => {
    e.preventDefault();

    axiosApp
      .post("sellers/login", formFields, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);

        if (res.ok) {
          toastAlert(res.data.message, "success");

          document.cookie = `token=${res.data.token}; path=${process.env.COOKIE_PATH}`;
          document.cookie = `phoneNumber=${res.data.phoneNumber}; path=${process.env.COOKIE_PATH}`;

          router.push("/");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => sendLoginRequest(e)}
        className="w-full sm:w-3/12 flex flex-col justify-center items-center border-0 sm:border border-gray-600 rounded-xl p-4 gap-4"
      >
        <Input
          label="ایمیل/ شماره همراه"
          placeholder="ایمیل یا شماره همراه خود را وارد کنید..."
          value={formFields.seller}
          parameter="seller"
          changeValue={changeFormFields}
        />
        <div className="w-full flex flex-row">
          <PasswordInput
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید..."
            value={formFields.password}
            parameter="password"
            changeValue={changeFormFields}
          />
        </div>
        <button
          type="submit"
          className="w-fit text-stone-900 border-2 self-center border-stone-900 rounded-lg py-1.5 px-4"
        >
          ورود
        </button>
        <Link href={"/register"}>ثبت نام نکرده اید؟ اینجا را کلیک کنید.</Link>
      </form>
    </div>
  );
};

export default Login;
