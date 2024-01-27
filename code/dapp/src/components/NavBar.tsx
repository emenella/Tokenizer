import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ToggleMode"
import ConnectWallet from "./ConnectWallet"


export default function NavBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Onglet 1</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Onglet 2</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Onglet 3</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <ConnectWallet/>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <ModeToggle/>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
};