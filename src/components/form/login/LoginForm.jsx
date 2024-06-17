import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from "next/link";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const useLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      switch (res.status) {
        case 200:
          toast.success(data.message);
          router.push("/dashboard/berita");
          break;
        case 400:
          throw new Error(data.error);
        case 500:
          throw new Error(data.error);
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-12 py-12 sm:px-12 lg:col-span-7 lg:px-36 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to <br />
              <Link href="/" className="font-bold text-green-700 ">
                Gangsalan Kidul
              </Link>{" "}
              🌾
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Untuk melanjutkan menikmati layanan ini dan mengakses semua fitur
              ada, silakan masuk dengan memasukkan akun Anda di bawah ini.
            </p>

            <div className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>

                <Input
                  type="text"
                  variant="bordered"
                  name="username"
                  size="md"
                  radius="sm"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>

                <Input
                  variant="bordered"
                  name="password"
                  size="md"
                  radius="sm"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={useLogin}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
