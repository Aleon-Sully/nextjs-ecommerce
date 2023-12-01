"use client";

import { Session } from "next-auth";
import Image from "next/image";
import profilePlaceHolder from "@/assets/profile-pic-placeholder.png"
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
    session: Session | null
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
    const user = session?.user;

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                {user ? (
                    <Image
                        src={user?.image || profilePlaceHolder}
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="w-10 rounded-full"
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                )
                }
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
            >
                <li>
                    {user ? <button onClick={() => signOut({
                        callbackUrl: "/"
                    })}>Sign Out</button> : <button onClick={() => signIn()}>Sign In</button>}
                </li>
            </ul>
        </div>
    )

}