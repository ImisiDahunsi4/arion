"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, EyeSlash, CheckCircle, ArrowRight, Lightning, Globe, Star, Lock, Lightning as Bolt, Wallet, GearSix, PlayCircle, TwitterLogo } from "@phosphor-icons/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F4F9] dark:bg-[#09090b] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200/50 dark:border-gray-800/50 bg-[#F5F4F9]/80 dark:bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">A</div>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white tracking-tight">Arion</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
            <WalletMultiButton className="!bg-violet-600 hover:!bg-violet-700 !rounded-full !text-sm !px-6 !py-2.5 !shadow-lg !shadow-violet-500/30" />
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 md:flex-row md:mt-0">
              <li>
                <Link href="#features" className="block py-2 px-3 text-gray-900 hover:text-violet-600 md:p-0 dark:text-white dark:hover:text-violet-400 transition-colors">Product</Link>
              </li>
              <li>
                <Link href="#how-it-works" className="block py-2 px-3 text-gray-900 hover:text-violet-600 md:p-0 dark:text-white dark:hover:text-violet-400 transition-colors">How it Works</Link>
              </li>
              <li>
                <Link href="https://docs.arion.app" className="block py-2 px-3 text-gray-900 hover:text-violet-600 md:p-0 dark:text-white dark:hover:text-violet-400 transition-colors">Docs</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-gradient-to-br from-[#E8E4F3] to-[#D5CEE8] dark:from-violet-900/20 dark:to-indigo-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-100 dark:bg-violet-900/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-semibold tracking-wide uppercase mb-6 border border-violet-200 dark:border-violet-800">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></span>
              Now Live on Solana Mainnet
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
              Private Payroll <br />
              on <span className="italic text-violet-600 font-normal">Solana</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
              Leveraging Zero-Knowledge proofs to shield salaries and transaction details. The compliant way to pay your team in crypto without exposing your treasury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/dashboard" className="bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-medium rounded-full text-base px-8 py-4 transition-all flex items-center justify-center gap-2">
                Start Now
                <ArrowRight size={18} />
              </Link>
              <Link href="https://docs.arion.app" className="bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-full text-base px-8 py-4 transition-all text-center">
                Read the Docs
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-500">
              <CheckCircle size={16} className="text-green-500" weight="fill" />
              <span>Audited by Radr Labs</span>
              <span className="mx-2">•</span>
              <CheckCircle size={16} className="text-green-500" weight="fill" />
              <span>No KYC Required</span>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5]">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-96 bg-gray-900 dark:bg-black rounded-3xl shadow-2xl rotate-[-6deg] z-10 border border-gray-800 flex flex-col justify-between p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600 blur-[60px] opacity-40"></div>
                <div className="flex justify-between items-start">
                  <Shield size={28} className="text-white opacity-80" weight="fill" />
                  <span className="text-xs font-mono text-gray-400">ZK-PROOF</span>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-12 bg-gray-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="text-3xl text-white font-mono">•••• ••••</div>
                    <div className="text-sm text-gray-400 font-mono flex justify-between">
                      <span>HIDDEN AMOUNT</span>
                      <span className="text-green-400">VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-96 bg-gradient-to-br from-violet-200 to-indigo-200 dark:from-violet-900 dark:to-indigo-900 rounded-3xl rotate-[6deg] opacity-60 z-0"></div>
              <div className="absolute bottom-20 -right-4 md:right-10 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Shield size={20} weight="fill" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Status</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">100% Private</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-500 mb-6 uppercase tracking-wider">Trusted by Privacy Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-1">
              <Lock size={20} className="text-gray-400" /> Privacy Cash
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-1">
              <Shield size={20} className="text-gray-400" /> Radr Labs
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-1">
              <ArrowRight size={20} className="text-gray-400" /> Range
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-1">
              <Lightning size={20} className="text-gray-400" weight="fill" /> Helius
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-24 bg-[#F5F4F9] dark:bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete Payroll Privacy</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Arion bridges the gap between on-chain transparency and real-world privacy needs using advanced cryptography.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-[#18181b] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={26} className="text-violet-600" weight="fill" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Shield SOL</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Wrap your SOL into private tokens instantly. Transactions are processed without revealing the sender's history.
              </p>
            </div>
            <div className="group bg-white dark:bg-[#18181b] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <EyeSlash size={26} className="text-violet-600" weight="fill" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hide Amounts</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Zero-Knowledge proofs ensure that salary amounts are mathematically verified but visually obscured from the public ledger.
              </p>
            </div>
            <div className="group bg-white dark:bg-[#18181b] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle size={26} className="text-violet-600" weight="fill" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Verify Totals</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Generate cryptographic proofs for auditors or tax authorities to verify total outflow without exposing individual recipient data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto bg-gray-900 dark:bg-zinc-900 rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-gray-800 to-transparent opacity-30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star size={14} weight="fill" />
                <Star size={14} weight="fill" />
                <Star size={14} weight="fill" />
                <Star size={14} weight="fill" />
                <Star size={14} weight="fill" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Payroll that feels <br />
                <span className="italic text-gray-400">magic.</span>
              </h2>
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Lightning size={28} weight="fill" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">&lt; 2 min Setup</h4>
                    <p className="text-gray-400 text-sm">Import your team and start streaming payments.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Globe size={28} weight="fill" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Global Compliance</h4>
                    <p className="text-gray-400 text-sm">Local currency conversion handled automatically.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Link href="/dashboard" className="bg-white text-black hover:bg-gray-100 font-medium rounded-full text-sm px-8 py-3 transition-colors inline-block">
                  View Dashboard Demo
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center md:justify-end">
              <Image
                src="/images/lp-image-1.png"
                alt="Abstract 3D crypto shapes"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl border border-gray-700/50 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#F5F4F9] dark:bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16">How it works</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center bg-[#F5F4F9] dark:bg-[#09090b] pt-4">
                <div className="w-16 h-16 mx-auto bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect Wallet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Link your Phantom or Solflare wallet. No registration or email required.</p>
              </div>
              <div className="text-center bg-[#F5F4F9] dark:bg-[#09090b] pt-4">
                <div className="w-16 h-16 mx-auto bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Configure Payroll</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Add recipient addresses and set amounts in USDC or SOL.</p>
              </div>
              <div className="text-center bg-[#F5F4F9] dark:bg-[#09090b] pt-4">
                <div className="w-16 h-16 mx-auto bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Execute Privately</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Sign one transaction. ZK proofs generate instantly and funds are dispersed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#18181b] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center text-white font-bold text-xs">A</div>
                <span className="self-center text-xl font-bold whitespace-nowrap text-gray-900 dark:text-white">Arion</span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The standard for private, compliant on-chain payroll. Built on Solana.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/" className="hover:text-violet-600 transition-colors">Home</Link></li>
                <li><Link href="#how-it-works" className="hover:text-violet-600 transition-colors">How it works</Link></li>
                <li><Link href="/pricing" className="hover:text-violet-600 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/terms" className="hover:text-violet-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-violet-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-violet-600 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Community</h4>
              <Link href="https://twitter.com/arionpay" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                <TwitterLogo size={14} weight="fill" /> / Twitter
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">© 2026 Arion Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
