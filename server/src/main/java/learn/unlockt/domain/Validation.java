package learn.unlockt.domain;

public class Validation {
    public static boolean isNullOrBlank(String value) {
        return value == null || value.isBlank();
    }
}
