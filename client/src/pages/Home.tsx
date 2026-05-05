import {
  Loader2Icon,
  MessageSquare,
  History,
  Eye,
  Edit3,
  ArrowRight,
} from "lucide-react";
import React, { useState } from "react";
import { useSession } from "../lib/auth-client";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import api from "../configs/axios";

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session?.user) {
        toast.error("Please sign in to create a project");
        return;
      } else if (!input.trim()) {
        toast.error("Please enter a message");
        return;
      }

      setLoading(true);

      const { data } = await api.post("/api/user/project", {
        initialPrompt: input,
      });

      setLoading(false);
      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create project",
      );
      console.log(error);
    }
  };

  const features = [
    {
      icon: <MessageSquare className="size-8 text-[#FF0000]" />,
      title: "Chat to Improve",
      description:
        "Continuously refine your website by simply chatting with our advanced AI. Ask for changes, and watch them happen.",
    },
    {
      icon: <Eye className="size-8 text-[#FF0000]" />,
      title: "Live Preview",
      description:
        "See your changes instantly. Our live preview ensures you know exactly how your site will look before publishing.",
    },
    {
      icon: <Edit3 className="size-8 text-[#FF0000]" />,
      title: "Live Manual Edit",
      description:
        "Want precise control? Edit the website content directly on the page while the AI handles the complex structure.",
    },
    {
      icon: <History className="size-8 text-[#FF0000]" />,
      title: "Rollback Versions",
      description:
        "Never fear making mistakes. Effortlessly rollback to any previous preview version of your website with a single click.",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 font-poppins selection:bg-[#FF0000]/20 selection:text-black">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-[10%] w-72 h-72 bg-[#DFF1F1] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-float"></div>
        <div className="absolute top-40 right-[10%] w-80 h-80 bg-[#BBD5DA] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-pulse-slow"></div>
        <div
          className="absolute -bottom-10 left-[30%] w-96 h-96 bg-[#FF0000]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
          <Link
            to="/pricing"
            className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-[#BBD5DA] hover:border-[#FF0000]/50 transition-all duration-300 rounded-full p-1.5 pr-5 text-sm mb-10 shadow-sm hover:shadow-md"
          >
            <span className="bg-[#FF0000] text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide">
              NEW
            </span>
            <p className="flex items-center gap-2 text-gray-700 font-medium">
              <span>Start your free 30-day trial</span>
              <ArrowRight className="size-3.5" />
            </p>
          </Link>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl mb-6 leading-[1.1]">
            Generate Single Page Websites{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#BBD5DA]">
              with AI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
            Stop coding from scratch. Describe your ideal single page website,
            and let our intelligent AI build, design, and deploy it in seconds.
          </p>

          <form
            onSubmit={onSubmitHandler}
            className="w-full max-w-3xl bg-white shadow-2xl shadow-[#DFF1F1]/60 rounded-3xl p-4 border border-[#BBD5DA]/60 focus-within:border-[#FF0000] focus-within:ring-4 focus-within:ring-[#FF0000]/10 transition-all duration-300 relative group z-20"
          >
            <div className="relative">
              <textarea
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 text-lg resize-none p-4 placeholder-gray-400 min-h-[140px]"
                placeholder="E.g., A modern portfolio for a freelance photographer with a dark theme and a gallery section..."
                required
              />
              <div className="absolute bottom-2 right-2">
                <button
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#D90000] text-white rounded-xl px-8 py-3.5 font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#FF0000]/20 hover:shadow-xl hover:shadow-[#FF0000]/30 transform active:translate-y-0"
                >
                  {!loading ? (
                    <>
                      Generate
                      <ArrowRight className="size-5" />
                    </>
                  ) : (
                    <>
                      Processing
                      <Loader2Icon className="animate-spin size-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white/50 relative backdrop-blur-sm border-t border-[#BBD5DA]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Built for complete control
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl leading-relaxed">
              Powerful features designed to give you precision over your
              AI-generated website while keeping the process effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-[#BBD5DA]/50 rounded-3xl p-8 hover:bg-[#DFF1F1]/40 hover:border-[#BBD5DA] transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-[#DFF1F1]"
              >
                <div className="bg-[#F5F5F5] w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-[#BBD5DA]/30 mb-8 group-hover:scale-110 group-hover:bg-[#DFF1F1] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white border-t border-[#BBD5DA]/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-10">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <img
              className="h-8 md:h-10 object-contain"
              src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg"
              alt="Framer"
            />
            <img
              className="h-8 md:h-10 object-contain"
              src="https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg"
              alt="Huawei"
            />
            <img
              className="h-8 md:h-10 object-contain"
              src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg"
              alt="Instagram"
            />
            <img
              className="h-8 md:h-10 object-contain"
              src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg"
              alt="Microsoft"
            />
            <img
              className="h-8 md:h-10 object-contain"
              src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg"
              alt="Walmart"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
