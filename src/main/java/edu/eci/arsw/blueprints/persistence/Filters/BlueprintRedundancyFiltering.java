package edu.eci.arsw.blueprints.persistence.Filters;



import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;

import edu.eci.arsw.blueprints.persistence.BlueprintFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@Qualifier("Redundancy")
public class BlueprintRedundancyFiltering implements BlueprintFilter {

    @Override
    public Blueprint filter(Blueprint bp) {
        ArrayList<Point> points=  new ArrayList<>(bp.getPoints());
        for(int i=0; i<bp.getPoints().size()-1; i++){
            if(bp.getPoints().get(i).equals(bp.getPoints().get(i+1))){
               points.remove(i);
            }
        }
        bp.setPoints(points);
        return bp;
    }
}
