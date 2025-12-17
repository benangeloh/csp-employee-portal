"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"

export function SignupToast() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast.info("Check your email", {
        description: "We've sent you a confirmation link. Please click it to verify your account.",
        duration: Infinity,
        closeButton: true,
      })
    }
  }, [searchParams])

  return null
}