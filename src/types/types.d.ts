type ForcedAny<Reason extends string> = Reason extends string ? any : never

export interface DropdownItem {
    label: string;
    value: string | number;
    custom?: ReactNode;
}
