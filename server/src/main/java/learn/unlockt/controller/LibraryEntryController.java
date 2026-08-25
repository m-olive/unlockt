package learn.unlockt.controller;

import learn.unlockt.domain.LibraryEntryService;
import learn.unlockt.domain.Result;
import learn.unlockt.model.LibraryEntry;
import learn.unlockt.model.LibraryStatus;
import learn.unlockt.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/library")
public class LibraryEntryController {
    private final LibraryEntryService service;

    public LibraryEntryController(LibraryEntryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Object> findAll(
            @AuthenticationPrincipal AppUserDetails details,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String platform,
            @RequestParam(required = false) String sort) {

        LibraryStatus parsed;
        try {
            parsed = parseStatus(status);
        } catch(IllegalArgumentException ex) {
            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }

        List<LibraryEntryResponse> entries = service
                .findByUserId(details.getUser().getId(), parsed, genre, platform, sort)
                .stream()
                .map(LibraryEntryResponse::from)
                .toList();

        return ResponseEntity.ok(entries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@AuthenticationPrincipal AppUserDetails details, @PathVariable UUID id) {
        LibraryEntry entry = service.findByIdAndUserId(id, details.getUser().getId());
        if(entry == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(LibraryEntryResponse.from(entry));
    }

    @PostMapping
    public ResponseEntity<Object> add(@AuthenticationPrincipal AppUserDetails details, @RequestBody LibraryEntryRequest request) {
        LibraryEntry data;
        try {
            data = toEntry(request);
        } catch(IllegalArgumentException ex) {
            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }

        Result<LibraryEntry> result = service.add(details.getUser().getId(), request.gameId(), data);
        if(result.isSuccess()) {
            return new ResponseEntity<>(LibraryEntryResponse.from(result.getPayload()), HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(
            @AuthenticationPrincipal AppUserDetails details,
            @PathVariable UUID id,
            @RequestBody LibraryEntryRequest request) {

        LibraryEntry data;
        try {
            data = toEntry(request);
        } catch(IllegalArgumentException ex) {
            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }

        Result<LibraryEntry> result = service.update(id, details.getUser().getId(), data);
        if(result.isSuccess()) {
            return ResponseEntity.ok(LibraryEntryResponse.from(result.getPayload()));
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@AuthenticationPrincipal AppUserDetails details, @PathVariable UUID id) {
        Result<LibraryEntry> result = service.deleteByIdAndUserId(id, details.getUser().getId());
        if(result.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ErrorResponse.build(result);
    }

    private LibraryEntry toEntry(LibraryEntryRequest request) {
        LibraryEntry entry = new LibraryEntry();
        entry.setStatus(parseStatus(request.status()));
        entry.setOverallRating(request.overallRating());
        entry.setDifficultyRating(request.difficultyRating());
        entry.setNotes(request.notes());

        return entry;
    }

    private LibraryStatus parseStatus(String status) {
        if(status == null || status.isBlank()) {
            return null;
        }

        try {
            return LibraryStatus.valueOf(status.toUpperCase());
        } catch(IllegalArgumentException ex) {
            throw new IllegalArgumentException("status must be one of: backlog, playing, completed, dropped");
        }
    }
}
