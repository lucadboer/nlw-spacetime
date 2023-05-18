import { Copyright } from '@/components/Copyright'
import { EmpityMemmories } from '@/components/EmpityMemmories'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { cookies } from 'next/headers'

export default function Home() {
  const token = cookies().get('token')?.value

  return (
    <main className="grid min-h-screen grid-cols-2">
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 blur-full"></div>

        {/* Stripe */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

        {token ? <Profile /> : <SignIn />}

        <Hero />

        <Copyright />
      </section>
      <section className="flex flex-col bg-[url(../assets/stars.svg)] bg-cover p-16">
        <EmpityMemmories />
      </section>
    </main>
  )
}
