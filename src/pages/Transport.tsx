import { mockTransportOffers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Star, Calendar, MessageSquare } from "lucide-react";

const Transport = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Laisvas transportas</h1>
        <p className="text-muted-foreground text-sm mt-1">Siūlomas transportas krovinių gabenimui</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockTransportOffers.map((offer) => (
          <Card key={offer.id} className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{offer.company}</h3>
                    <p className="text-xs text-muted-foreground">{offer.vehicleType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-warning/10">
                  <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  <span className="text-sm font-semibold">{offer.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{offer.from} → {offer.to}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Laisvas nuo: {offer.availableDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Talpa</p>
                  <p className="font-semibold font-mono">{offer.capacity} t</p>
                </div>
                {offer.pricePerKm && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Kaina/km</p>
                    <p className="font-bold text-accent font-mono">€{offer.pricePerKm}</p>
                  </div>
                )}
              </div>

              <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" /> Susisiekti
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transport;
