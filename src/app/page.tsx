import Image from 'next/image'
import SigninButton from './components/SigninButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SigninButton/>
    </main>
  )
}
