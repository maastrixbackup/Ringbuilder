import { motion } from "framer-motion";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

export default function LuxuryHomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 font-serif">
      <Header />

      <section className="relative h-screen flex items-center justify-center pt-16 overflow-hidden">
        <motion.img
          src="https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d65b62dd7a002173a24b_optimized_1329.webp"
          alt="Luxury Diamond Ring"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 text-center text-white"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            Your Dream Ring, Perfected
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Discover timeless beauty with our handcrafted custom rings.
          </motion.p>
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/rings")}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-10 py-4 rounded-full shadow-lg text-lg font-semibold"
          >
            Start Building
          </motion.button>
        </motion.div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600 bg-clip-text text-transparent">
            Signature Collections
          </h2>
          <div className="w-28 h-1 mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            {
              type: "Gold",
              img: `https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d3f579fc4a00219b712e_optimized_1329_c1329x977-0x0.webp`,
            },
            {
              type: "Platinum",
              img: `https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d66962dd7a002173a24f_optimized_1329.webp`,
            },
            {
              type: "Rose Gold",
              img: `https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d5be56d6ce0022e77b52_optimized_1920_c1920x1412-0x0.webp`,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
              }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={item.img}
                alt={item.type}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold">{item.type} Rings</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Timeless elegance in {item.type.toLowerCase()}.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <motion.img
            src="https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d44279fc4a00219b71f0_optimized_1581_c1329x977-83x68.webp"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Masterful Craftsmanship</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Each ring is forged with precision, passion, and artistry,
              ensuring a creation that's as unique as your love story.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-3 text-lg rounded-full shadow-md"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((t) => (
              <motion.div
                key={t}
                initial="hidden"
                whileInView="show"
                variants={fadeInUp}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <p className="mb-4">
                  “The ring exceeded all my expectations. The craftsmanship and
                  attention to detail are unmatched.”
                </p>
                <span className="block font-bold">— Sarah L.</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600 bg-clip-text text-transparent">
            New Arrivals
          </h2>
          <div className="w-28 h-1 mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <motion.img
            // key={i}
            src={`https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d68d56d6ce0022e77bd3_optimized.webp`}
            alt="Gallery"
            className="w-full h-64 object-cover rounded-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
          />
          <motion.img
            // key={i}
            src={`https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d5ae56d6ce0022e77b4a_optimized_1920_c1920x1411-0x0.webp`}
            alt="Gallery"
            className="w-full h-64 object-cover rounded-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
          />
          <motion.img
            // key={i}
            src={`https://res2.weblium.site/res/5e42b963ba05900021d32109/5e42d55456d6ce0022e77b07_optimized_1920_c1920x1412-0x0_flop.webp`}
            alt="Gallery"
            className="w-full h-64 object-cover rounded-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
