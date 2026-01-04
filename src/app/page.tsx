import { HomeClient } from "@/components/HomeClient"
import { profile } from "@/data/profile"

export default function Page() {
  return <HomeClient data={profile} />
}
