package edu.eci.arsw.blueprints.persistence;


import edu.eci.arsw.blueprints.model.Blueprint;

public interface BlueprintFilter {
    public Blueprint filter(Blueprint bp);
}
