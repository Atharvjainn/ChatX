"use client";
import {Field,FieldDescription,FieldGroup,FieldLabel,FieldLegend,FieldSet} from "@/components/ui/field"
import { Mail,User,Lock,LoaderIcon } from "lucide-react"
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSearchBox from "@/components/AnimatedBox";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";


export default function SignupPage() {
  const [formData,setFormData] = useState({email : "",password : ""});
  const {isLogginingin,Login} = useAuthStore()

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    Login(formData)
  }


  return (
      <Card className="w-full max-w-4xl overflow-hidden bg-[#0b0f1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl px-4">
        <CardContent className="grid md:grid-cols-2 p-0">

          {/* LEFT: FORM */}
          <div className="p-8 sm:px-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldSet>
                  <FieldLegend className="text-white text-2xl">Log in</FieldLegend>
                  <FieldDescription className="text-base">Log in to continue chatting</FieldDescription>
                  <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="Email">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="Email" type="Email" placeholder="Maxleither@gmail.com" className="pl-10"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData,email : e.target.value})}
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10"
                       value={formData.password}
                       onChange={(e) => setFormData({...formData,password : e.target.value})}
                      />
                    </div>
                    
                  </Field>
                  </FieldGroup>
              </FieldSet>
              <div className="flex flex-col items-center pt-4 gap-3">
                {
                  isLogginingin ?
                  <LoaderIcon className='w-full h-7 animate-spin text-center text-white'/>
                  : 
                  <Button variant="outline" className="w-full cursor-pointer">Login</Button>
                }
                
                <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium underline-offset-4 hover:underline text-white"
                >
                  Signup
                </Link>
              </p>
              </div>
              
            </form>

          


            

            </div>

          {/* RIGHT: IMAGE */}
          <div className="relative hidden md:block">
            <div className="h-full w-full bg-linear-to-br from-[#1b1f3b] via-[#2a2f5a] to-[#1a1d3a] rounded-2xl flex justify-center px-4 items-center" >
              <AnimatedSearchBox />
              </div>

           
          </div>

        </CardContent>
      </Card>
    
  );
}
