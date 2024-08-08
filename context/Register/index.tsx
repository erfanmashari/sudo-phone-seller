"use client";

import FieldContainer from "@/components/Form/FieldContainer";
import Input from "@/components/Form/Input";
import PasswordInput from "@/components/Form/PasswordInput";

import Link from "next/link";

import { FormEvent, useState } from "react";

import axiosApp from "@/utils/axiosApp.util";
import {
  checkFetchResponse,
  toastAlert,
  getTokenFromCookie,
} from "@/functions";

const Register = () => {
  const [formFields, setFormFields] = useState({
    nameFa: "",
    nameEn: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    nationalCode: "",
    rules: true,
  });

  const changeFormFields = (parameter: string, value: string) => {
    const newFormFields: any = { ...formFields };
    newFormFields[parameter] = value;
    setFormFields(newFormFields);
  };

  // send register request to backend
  const sendRegisterRequest = (e: FormEvent) => {
    e.preventDefault();

    axiosApp
      .post("sellers/register", formFields, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);

        if (res.ok) {
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => sendRegisterRequest(e)}
        className="w-full sm:w-6/12 flex flex-col justify-center items-center border-0 sm:border border-gray-600 rounded-xl p-4 gap-4"
      >
        <FieldContainer>
          <Input
            label="نام فارسی فروشگاه"
            placeholder="نام فارسی فروشگاه خود را وارد کنید..."
            required={true}
            value={formFields.nameFa}
            parameter="nameFa"
            changeValue={changeFormFields}
          />
          <Input
            label="نام انگلیسی فروشگاه"
            placeholder="نام انگلیسی فروشگاه خود را وارد کنید..."
            required={true}
            value={formFields.nameEn}
            parameter="nameEn"
            changeValue={changeFormFields}
          />
        </FieldContainer>
        <FieldContainer>
          <Input
            label="شماره همراه"
            placeholder="شماره همراه خود را وارد کنید..."
            required={true}
            value={formFields.phoneNumber}
            parameter="phoneNumber"
            changeValue={changeFormFields}
          />
          <Input
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید..."
            type="email"
            required={true}
            value={formFields.email}
            parameter="email"
            changeValue={changeFormFields}
          />
        </FieldContainer>
        <FieldContainer>
          <PasswordInput
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید..."
            required={true}
            value={formFields.password}
            parameter="password"
            changeValue={changeFormFields}
          />
          <PasswordInput
            label="تایید رمز عبور"
            placeholder="تایید رمز عبور خود را وارد کنید..."
            required={true}
            value={formFields.confirmPassword}
            parameter="confirmPassword"
            changeValue={changeFormFields}
          />
        </FieldContainer>
        <Input
          width={"w-full sm:w-6/12"}
          label="کد ملی"
          placeholder="کد ملی خود را وارد کنید..."
          required={true}
          value={formFields.nationalCode}
          parameter="nationalCode"
          changeValue={changeFormFields}
        />
        <button
          type="submit"
          className="w-fit text-stone-900 border-2 self-center border-stone-900 rounded-lg py-1.5 px-4"
        >
          ثبت نام
        </button>
        <p>با ثبت نام، قوانین فروشندگان سودوفون را میپذیرم.</p>
        <Link href={"/login"}>اکانت دارید؟ اینجا را کلیک کنید.</Link>
      </form>
    </div>
  );
};

export default Register;
