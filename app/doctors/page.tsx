import ChatWindow from '@/components/chat-window'

export default async function DoctorsPage() {
  return (
    <div className="min-h-[calc(100vh-3rem)]">
      <h1>Doctors</h1>
      <div>
        <ChatWindow />
      </div>
    </div>
  )
}
