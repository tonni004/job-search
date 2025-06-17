import {useRouter} from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
  <button
    onClick={() => router.back()}
    className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    Back
  </button>
  )
}
