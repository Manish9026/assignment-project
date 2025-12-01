"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { ROUTES } from "@/common/utils/constants";
import Navbar from "@/common/components/Navbar";
import SafetyCheckRoundedIcon from '@mui/icons-material/SafetyCheckRounded';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { initAuth, isAuthenticated, isLoading,setLoading ,isAuthenticState} = useAuthStore();
  const router = useRouter();

  // Load auth state from localStorage
  useEffect(() => {


    const time=setTimeout(()=>{
        setLoading(true);
        initAuth();
    },500);

    return ()=>clearTimeout(time);
  }, []);

  console.log(isLoading,isAuthenticated,isAuthenticState);
  
  // Redirect when auth is evaluated
  useEffect(() => {
    if (!isLoading && isAuthenticated === false && isAuthenticState !== 'initial') {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  // Show a loader while reading localStorage
  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-screen">

<SafetyCheckRoundedIcon  className=" text-8xl text-blue-500 size-40" style={{fontSize:"40px"}} />
<p>Validate Creads....</p>

    </div>;
  }

  // Prevent flashing unauthorized content
  if (!isAuthenticated) {
    return null; // blank until router.replace happens
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
