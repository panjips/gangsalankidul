import { motion } from "framer-motion";

export const StaggeredFadeLoader = () => {
  const circleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="h-4 w-4 rounded-full bg-green-500"
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.9,
            delay: index * 0.01,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      ))}
    </div>
  );
};
