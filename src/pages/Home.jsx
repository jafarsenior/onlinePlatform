import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#1E1E1E] text-white px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-4 text-[#C5A46D]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        🏠 Home Page
      </motion.h1>
      <motion.p
        className="text-gray-300 mb-6 max-w-xl text-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Welcome to the Home page! This is a simple example using Framer Motion for smooth entrance animations.
      </motion.p>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div className="bg-[#C5A46D]/20 p-6 rounded-xl shadow-lg hover:scale-105 transition transform cursor-pointer" whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
          <p className="text-gray-200 text-sm">Quick overview of your metrics</p>
        </motion.div>
        <motion.div className="bg-[#C5A46D]/20 p-6 rounded-xl shadow-lg hover:scale-105 transition transform cursor-pointer" whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p className="text-gray-200 text-sm">Track your progress and stats</p>
        </motion.div>
        <motion.div className="bg-[#C5A46D]/20 p-6 rounded-xl shadow-lg hover:scale-105 transition transform cursor-pointer" whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <p className="text-gray-200 text-sm">Manage your preferences</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
