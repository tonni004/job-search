"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-300 text-white py-2 px-4 rounded hover:bg-red-400"
    >
      Log out
    </button>
  );
}
