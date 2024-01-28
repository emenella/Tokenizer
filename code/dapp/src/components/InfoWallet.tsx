import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext } from "react"
import { Wallet, WalletContext } from "@/context/wallet"
import * as blockies from 'blockies-ts';

const getShortAddress = (address: string) =>
{
    const displayLength = 4
    if (!address || address.length < displayLength * 2) {
        return address; // Return the full address if it's too short
    }
    
    const start = address.slice(0, displayLength);
    const end = address.slice(-displayLength);
    
    return `${start}...${end}`;
}

interface ProfileInterface
{
    wallet: Wallet
}

const Profile = (props: ProfileInterface): JSX.Element => 
{
    const imgSrc = blockies.create({ seed: props.wallet.address, size: 8, scale: 3 }).toDataURL();

    return (
        <Card className="w-full h-9 flex flex-cols gap-2 content-center items-center">
            <Avatar className="w-6 h-6">
                <AvatarImage src={imgSrc}>
                </AvatarImage>
                <AvatarFallback className="text-xs">{getShortAddress(props.wallet.address)}</AvatarFallback>
            </Avatar>
            <p>{props.wallet.ens !== null ? props.wallet.ens : getShortAddress(props.wallet.address)}</p>
        </Card>
    )
}


export default function InfoWallet(): JSX.Element
{
    const { wallets } = useContext(WalletContext);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Profile wallet={wallets[0]}/></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}