if (typeof CtvDfpAd == "undefined") {
    var CtvDfpAd = function (g, gpa) {
        this.g = g;
        this.gpa = gpa;

        this.PageTargets = new Array();

        this.AdSlots = new Array();
        CtvDfpAd.__instance = this;
    };

    CtvDfpAd.GetInstance = function () {
        if (!CtvDfpAd.__instance) {
            CtvDfpAd.__instance = new CtvDfpAd();
        }

        return CtvDfpAd.__instance;
    };

    CtvDfpAd.prototype.AddPageTarget = function (targets) {

        if (targets!== undefined) {
            for (var t in targets) {
                var newTarget = new Object();
                newTarget[t] = targets[t];
                this.PageTargets.push(newTarget);
            }
        }
    };

    ///This needs to be called to process added page targets and set then appropriately in googletags//
    CtvDfpAd.prototype.SetPageTargets = function() {
        for (var pg in this.PageTargets) {
            for (var p in this.PageTargets[pg]) {
                this.gpa.setTargeting(p, this.PageTargets[pg][p]);
            }
        }
    };
    CtvDfpAd.prototype.AddSlot = function (adAlias, dimensions, divId, options) {
        //var slot = this.g.defineSlot(adAlias, dimensions, divId).addService(this.gpa);
        var slot = this.g.defineSlot(adAlias, dimensions, divId).addService(this.gpa).addService(this.g.companionAds()).setCollapseEmptyDiv(true);
        
        if (options !== undefined) {
            if (options.targeting !== undefined) {
                var slotTargeting = options.targeting;
                for (var t in options.targeting) {
                    slot.setTargeting(t, slotTargeting[t]);
                }
            }
        }
        slot.slotId = divId;
        this.AdSlots.push(slot);
    };

    CtvDfpAd.prototype.AddOutOfPageSlot = function (adAlias, divId) {
        //var slot = this.g.defineOutOfPageSlot(adAlias, divId).addService(this.gpa);
        var slot = this.g.defineOutOfPageSlot(adAlias, divId).addService(this.gpa).addService(this.g.companionAds());

        slot.slotId = divId;
        this.AdSlots.push(slot);
    };

    CtvDfpAd.prototype.GetSlot = function (slotId) {
        for (var s in this.AdSlots) {
            if (this.AdSlots[s].slotId == slotId)
                return this.AdSlots[s].slotId;
        }
        return undefined;
    };

    //adds slot definitions to googlead
    CtvDfpAd.prototype.DefineSlots = function() {

    };
}