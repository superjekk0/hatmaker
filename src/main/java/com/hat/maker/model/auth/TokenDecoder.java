package com.hat.maker.model.auth;

import org.apache.commons.codec.binary.Base64;

import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TokenDecoder {

    public static String decodedSub(String token) {
        try {
            String body = decodeTokenBody(token);
            return extractValue(body, "\"sub\":\\s*\"(\\w+@\\w+\\.\\w+)", Function.identity());
        } catch (Exception e) {
            throw new IllegalArgumentException("eTokenInvalide");
        }
    }

    public static Role decodeRole(String token) {
        try {
            String body = decodeTokenBody(token);
            return extractValue(body, "\"authority\":\"([^\"]+)\"", Role::valueOf);
        } catch (Exception e) {
            throw new IllegalArgumentException("eTokenInvalide");
        }
    }

    public static Long decodeId(String token) {
        try {
            String body = decodeTokenBody(token);
            return extractValue(body, "\"id\":\\s*(\\d+)", Long::parseLong);
        } catch (Exception e) {
            throw new IllegalArgumentException("eTokenInvalide");
        }
    }

    private static String decodeTokenBody(String token) {
        String[] splitString = token.split("\\.");
        String base64EncodedBody = splitString[1];
        Base64 base64Url = new Base64(true);
        return new String(base64Url.decode(base64EncodedBody));
    }

    private static <T> T extractValue(String body, String regex, Function<String, T> converter) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(body);
        if (matcher.find()) {
            return converter.apply(matcher.group(1));
        }
        return null;
    }
}
