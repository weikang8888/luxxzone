"use client";

import { useParams, redirect } from "next/navigation";

export default function GenderPage() {
    const params = useParams();
    const gender = params.gender === "men" || params.gender === "women" ? params.gender : "men";
    redirect(`/${gender}/new-arrivals`);
}
