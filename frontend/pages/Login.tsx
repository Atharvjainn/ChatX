"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedSearchBox from "@/components/AnimatedBox";
import { FieldLegend } from "@/components/ui/field";

export default function SignupPage() {
  return (
      <Card className="w-full max-w-4xl overflow-hidden bg-[#0b0f1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl px-4">
        <CardContent className="grid md:grid-cols-2 p-0">

          {/* LEFT: FORM */}
          <div className="p-8 sm:px-5">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Sign up to start chatting
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                Sign Up
              </Button>

              <p className="text-sm text-center text-muted-foreground mt-4">
                Already have an account?{" "}
                <span className="text-purple-400 hover:underline cursor-pointer">
                  Sign in
                </span>
              </p>
            </div>
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
