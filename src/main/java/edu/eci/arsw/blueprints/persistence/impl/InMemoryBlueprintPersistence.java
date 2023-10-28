/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

/**
 *
 * @author hcadavid
 */
@Component
public class InMemoryBlueprintPersistence implements BlueprintsPersistence {

    private final Map<Tuple<String, String>, Blueprint> blueprints = new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        // load stub data
        Point[] pts = new Point[] { new Point(140, 140), new Point(115, 115), new Point(115, 115) };
        Blueprint bp = new Blueprint("lina", "bpname", pts);
        blueprints.put(new Tuple<>(bp.getAuthor(), bp.getName()), bp);

        Point[] pts1 = new Point[] { new Point(150, 150), new Point(165, 165) };
        Blueprint bp1 = new Blueprint("mario", "bpname1", pts1);
        blueprints.put(new Tuple<>(bp.getAuthor(), bp1.getName()), bp1);

        Point[] pts2 = new Point[] { new Point(114, 114), new Point(111, 111) };
        Blueprint bp2 = new Blueprint("luis", "bpname2", pts2);
        blueprints.put(new Tuple<>(bp.getAuthor(), bp2.getName()), bp2);

        Point[] pts3 = new Point[] { new Point(200, 200), new Point(200, 200) };
        Blueprint bp3 = new Blueprint("mario", "bpname3", pts3);
        blueprints.put(new Tuple<>(bp.getAuthor(), bp3.getName()), bp3);

    }

    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(), bp.getName()))) {
            throw new BlueprintPersistenceException("The given blueprint already exists: " + bp);
        } else {
            blueprints.putIfAbsent(new Tuple<>(bp.getAuthor(), bp.getName()), bp);
        }
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        for (Blueprint blueprint : blueprints.values()) {
            if (blueprint.getAuthor().equals(author) && blueprint.getName().equals(bprintname)) {
                return blueprint;

            }
        }
        throw new BlueprintNotFoundException("Blueprint not found");
    }

    @Override
    public Set<Blueprint> getBlueprintByAuthor(String author) throws BlueprintNotFoundException {
        HashSet<Blueprint> hashSet = new HashSet<>();
        boolean authorExits = false;
        for (Blueprint blueprint : blueprints.values()) {
            if (blueprint.getAuthor().equals(author)) {
                authorExits = true;
                hashSet.add(blueprint);
            }
        }
        if (!authorExits) {
            throw new BlueprintNotFoundException("Author not found");
        }
        return hashSet;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() {
        return new HashSet(blueprints.values());
    }

    @Override
    public void deleteBlueprints() {
        blueprints.clear();
    }
}
