import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { RegistrationWidget } from '../widget'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'

type WidgetStatus = 'idle' | 'active' | 'error' | 'success'


function EnsCard({ onComplete }: { onComplete: (val: string) => void }) {
    const { openConnectModal } = useConnectModal()
    const [status, setStatus] = useState<WidgetStatus>('idle')

    const handleStatusUpdate = (newStatus: WidgetStatus) => {
        setStatus(newStatus)
    }

    return (
        <Card>
            <CardHeader className="space-y-1 justify-start align-left">
                <CardTitle className="text-xl text-left">Create an ENS Domain</CardTitle>
                <CardDescription className="text-left">
                    Help your customers find you more easily by creating an ENS Domain
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="">
                    {/* <ConnectButton showBalance={true} label={"Mint"} /> */}

                    <RegistrationWidget
                        connectAction={openConnectModal}
                        onStatusUpdate={handleStatusUpdate}
                        trackingCode="demo.eth"
                        hasContainer={false}
                        theme="light"
                        onComplete={onComplete}
                        hasHeader={false}

                    />
                </div>
            </CardContent>
        </Card>

    )
}

export default EnsCard;