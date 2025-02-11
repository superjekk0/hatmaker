import React from "react";

export const trimField = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((self:string) => self.trim())
}
