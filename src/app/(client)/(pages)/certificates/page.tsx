"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter()
  const [certificateId, setCertificateId] = React.useState('')
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/certificates/${certificateId}`)
  }
  return (
    <div className="min-h-[80vh] container w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl px-4 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Certificate Verification</h1>
        </div>

        <form onSubmit={handleSearch} className="w-full space-y-4">
          <div className="relative flex">
            <Input
              type="text"
              autoFocus
              placeholder="Enter your certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className=' rounded-r-none'
            />
            <Button
              type="submit"
              size="icon"
              className='rounded-l-none'
            >
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search certificate</span>
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Enter your unique certificate ID to verify its authenticity and view details
        </p>
      </div>
    </div>
  )
}

export default Page