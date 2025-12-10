"use client";

import { Heart, Truck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MdLockOutline } from "react-icons/md";

const steps = [
  {
    id: 1,
    label: "Step 01",
    title: "Peanuts are grown in East-Southern states",
    short: "Grown on farms",
    icon: "🌱"
  },
  {
    id: 2,
    label: "Step 02",
    title: "Delivered to Los Angeles",
    short: "Shipped to LA",
    icon: "🚚"
  },
  {
    id: 3,
    label: "Step 03",
    title: "Freshly roasted in our factory",
    short: "Freshly roasted",
    icon: "🔥"
  },
  {
    id: 4,
    label: "Step 04",
    title: "Delivered to your home",
    short: "Delivered to you",
    icon: "🏠"
  },
];

 const features = [
    {
      icon: <Truck size={32} />,
      title: "Free Shipping",
      subtitle: "Fast delivery for all domestic orders",
    },
    {
      icon: <MdLockOutline size={32} />,
      title: "Secure Payments",
      subtitle: "Safe & encrypted checkout",
    },
    {
      icon: <Users size={32} />,
      title: "Customer Priority",
      subtitle: "Dedicated support & quick responses",
    },
    {
      icon: <Heart size={32} />,
      title: "Made with Love",
      subtitle: "Premium quality & trusted service",
    },
  ];

const Page = () => {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            From Farm to Your Home
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-600">
            Follow the journey of our peanuts, from East-Southern farms to fresh
            roasting in California and delivery to your doorstep.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: visual + timeline */}
          <div>
            {/* Visual card with motion */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-400 p-6 shadow-xl"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
                  K H Food
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  The Peanut Journey
                </h3>
                <p className="mt-2 text-sm text-amber-100/90">
                  Every batch is freshly roasted in our California factory to
                  bring out the best flavor and crunch.
                </p>

                {/* Animated icon  */}
                <motion.div
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-amber-100/10 px-4 py-2 backdrop-blur"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-lg">🚚</span>
                  <span className="text-xs font-medium text-amber-50">
                    Fresh batches on the move
                  </span>
                </motion.div>

                {/* Progress indicator */}
                <div className="mt-8 flex items-center gap-3 text-xs font-medium text-amber-100">
                  <span>{activeStep.label}</span>
                  <div className="h-[2px] flex-1 rounded-full bg-amber-200/40">
                    <motion.div
                      className="h-[2px] rounded-full bg-white"
                      layout
                      initial={false}
                      style={{
                        width: `${(activeStep.id / steps.length) * 100}%`
                      }}
                    />
                  </div>
                  <span>
                    {activeStep.id}/{steps.length}
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  {activeStep.short}
                </p>
              </div>

              {/* Background peanuts / shapes */}
              <div className="pointer-events-none absolute -right-10 top-6 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-orange-400/40 blur-3xl" />
            </motion.div>

            {/* Horizontal stepper */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-4 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-amber-100">
                {steps.map((step) => {
                  const isActive = step.id === activeStep.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step)}
                      className={`relative flex flex-1 flex-col items-start rounded-xl px-4 py-3 text-left transition-all ${
                        isActive
                          ? "bg-amber-600 text-white shadow-md"
                          : "bg-white text-slate-800 hover:bg-amber-50"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          className="pointer-events-none absolute inset-0 rounded-xl border border-amber-300/80"
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10 text-xl">{step.icon}</span>
                      <span className="relative z-10 mt-2 text-xs font-semibold uppercase tracking-[0.2em]">
                        {step.label}
                      </span>
                      <span className="relative z-10 mt-1 text-sm font-medium">
                        {step.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: detailed step description */}
          <div className="space-y-8">
            {/* Active step detail */}
            <motion.div
              key={activeStep.id}
              className="rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-amber-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                {activeStep.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {activeStep.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                From carefully selected farms to controlled roasting conditions,
                every step is designed to protect freshness, crunch, and flavor.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>
                    Strict quality checks at each stage of the journey.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>
                    Roasted in small batches in our California facility.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Small story line */}
            <p className="text-xs text-slate-500">
              K H Food has been roasting peanuts in Orange County, California
              since 1991, always focused on delivering the highest quality in
              every pack.
            </p>
          </div>
        </div>

        <div className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-all duration-300 bg-white"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#F4E5D2] text-[#8C2C1A] mb-4 shadow">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-1 text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
