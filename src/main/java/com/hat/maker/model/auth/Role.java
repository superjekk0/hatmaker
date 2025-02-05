package com.hat.maker.model.auth;

import java.util.HashSet;
import java.util.Set;

public enum Role {
    RESPONSABLE("ROLE_RESPONSABLE"),
    MONITEUR("ROLE_MONITEUR"),
    SPECIALISTE("ROLE_SPECIALISTE");

    private final String string;
    private final Set<Role> managedRoles = new HashSet<>();

    static{
        RESPONSABLE.managedRoles.add(RESPONSABLE);
        RESPONSABLE.managedRoles.add(SPECIALISTE);
        RESPONSABLE.managedRoles.add(MONITEUR);
    }

    Role(String string){
        this.string = string;
    }

    @Override
    public String toString(){
        return string;
    }
}
