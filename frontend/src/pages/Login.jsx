import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ email }));
        toast({
          title: "Login Successful",
          description: "You are now logged in as an admin.",
        });
        navigate("/admin/blogs");
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            <div className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl overflow-hidden max-w-md mx-auto p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center"> Sign In</h1>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg">
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>

                    <p className="mt-4 text-center text-gray-400 text-sm">
                    Create an account?{' '}
                  <a href="/register" className="text-blue-400 hover:text-blue-600 font-semibold">
                    Sign Up here
                  </a>
                </p>

              <div className="mt-4 pt-2 border-t border-blue-500/10">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Or login with
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                    disabled
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                    disabled
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                    disabled
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;