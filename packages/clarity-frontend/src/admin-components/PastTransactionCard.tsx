import {
    ArrowUpRight,
} from "lucide-react"

import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"

import React, { useEffect, useState } from 'react';

import nounsimage1 from "../images/noun1.png"

function PastTransactionCard() {
    const [address, setAddress] = useState('');


    return (
        <Card className="xl:col-span-2" >
            <CardHeader className="flex flex-column items-start">
                <div className="flex flex-row justify-between w-full items-center">
                    <CardTitle className="text-lg font-large">
                        Transaction History
                    </CardTitle>
                    <Button>Export CSV</Button>
                </div>

                <CardDescription className="text-lg font-large text-left">
                    View and download all transactions on the blockchain for Auditing, Financing, and Investor Relations
                </CardDescription>

            </CardHeader>


            {/* <CardContent>
                <Tabs defaultValue="review">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="review">review</TabsTrigger>
                            <TabsTrigger value="transactions">transaction</TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </CardContent> */}

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Customer</TableHead>
                            <TableHead className="text-center">Date</TableHead>
                            <TableHead className="text-right">View Attestations</TableHead>
                            <TableHead className="hidden xl:table-column">
                                Status
                            </TableHead>
                            <TableHead className="hidden xl:table-column">
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {/* <div className="flex flex-col items-start">
                                    <div className="flex flex-col items-center">
                                        <img className="h-12 w-auto" src={nounsimage1} alt="profileimage" />
                                        <div className="font-medium mt-2">kenneth.ens</div>
                                    </div>
                                </div> */}
                                <div className="flex items-center">
                                    <img className="h-12 w-auto" src={nounsimage1} alt="profileimage" />
                                    <div className="font-medium ml-2 flex justify-start">
                                        <a
                                            href={`https://etherscan.io/address/nounders.eth`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="text-black underline flex items-center">
                                            kenneth.eth
                                            <ArrowUpRight className="h-6" />
                                        </a>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">12 Jan 2000</TableCell>
                            <TableCell className="text-right">
                                <div className="flex flex-col justify-end">
                                    <div className="flex justify-end items-center">
                                        <strong>Payment: </strong>
                                        <a
                                            href={`https://tonscan.org/transaction/0xad9213unajsduasdsaudad`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black underline flex items-center"
                                        >
                                            0xad9213unajsduasdsaudad
                                            <ArrowUpRight className="h-6" /> {/* Add margin to the left of the icon */}
                                        </a>
                                    </div>

                                    <div className="flex justify-end items-center">
                                        <strong>Review: </strong>
                                        <a
                                            href={`https://tonscan.org/transaction/0xad9213unajsduasdsaudad`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black underline flex items-center"
                                        >
                                            0xad9213unajsduasdsaudad
                                            <ArrowUpRight className="h-6" /> {/* Add margin to the left of the icon */}
                                        </a>
                                    </div>

                                </div>

                            </TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </CardContent >
        </Card >
    )
}

export default PastTransactionCard;