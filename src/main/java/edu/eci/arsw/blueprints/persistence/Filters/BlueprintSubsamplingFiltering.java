package edu.eci.arsw.blueprints.persistence.Filters;


import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;

import edu.eci.arsw.blueprints.persistence.BlueprintFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@Qualifier("Subsampling")
public class BlueprintSubsamplingFiltering implements BlueprintFilter {
    private int cont=0;
    @Override
    public Blueprint filter(Blueprint bp) {
        ArrayList<Point> points=  new ArrayList<>(bp.getPoints());
        for(int i=0; i<bp.getPoints().size(); i++){
            if(cont==2){
                points.remove(i);
                cont=0;
            }else {
                cont++;
            }
        }
        bp.setPoints(points);
        return bp;
    }
}
