import { MinimalHomeClient } from "@/components/MinimalHomeClient"
import { profile } from "@/data/profile"

export default function Page() {
  return <MinimalHomeClient data={profile} />
}
