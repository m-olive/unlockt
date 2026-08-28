package learn.unlockt.controller;

import learn.unlockt.domain.Result;
import learn.unlockt.domain.SteamService;
import learn.unlockt.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/steam")
public class SteamController {
    private final SteamService service;

    public SteamController(SteamService service) {
        this.service = service;
    }

    @PostMapping("/link")
    public ResponseEntity<Object> linkSteam(@AuthenticationPrincipal AppUserDetails details, @RequestBody SteamLinkRequest request) {
        Result<String> result = service.linkSteamAccount(details.getUser().getId(), request.linkInput());

        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
