package com.backend.service;

import com.backend.observer.Participant;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ParticipantService {
    private final Map<String, Participant> users = new HashMap<>();

    public String getUsers() {
        Gson gson = new Gson();
        JsonArray jsonArray = gson.toJsonTree(users.keySet()).getAsJsonArray();
        return jsonArray.toString();
    }

    public Participant getUser(String userName) {
        return users.get(userName);
    }

    public void addUser(String userName) {
        if (!users.containsKey(userName)) {
            users.put(userName, new Participant(userName));
        } else {
            throw new IllegalArgumentException("Participant already exists: " + userName);
        }
    }
}
