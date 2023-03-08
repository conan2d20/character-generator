export enum Source {
    Core,
    Thief,
    Barbarian,
    Skelos,
    Mercenary,
    Pirate,
    Cults,
    Brigand,
    Beastmasters,
    Scout,
    Wanderer,
    King,
    Adventurer,
    Exiles,
    Kull,
}

class SourceViewModel {
    id: Source;
    name: string;

    constructor(id: Source, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class Sources {
    private _sources: { [id: number]: string } = {
        [Source.Core]: "Core",
        [Source.Thief]: "Thief",
        [Source.Barbarian]: "Barbarian",
        [Source.Skelos]: "Skelos",
        [Source.Mercenary]: "Mercenary",
        [Source.Pirate]: "Pirate",
        [Source.Cults]: "Cults",
        [Source.Brigand]: "Brigand",
        [Source.Beastmasters]: "Beast Masters",
        [Source.Scout]: "Scout",
        [Source.Wanderer]: "Wanderer",
        [Source.King]: "King",
        [Source.Adventurer]: "Adventurer",
        [Source.Exiles]: "Exiles",
        [Source.Kull]: "Kull"
    };

    getSources() {
        var sources: SourceViewModel[] = [];
        var n = 0;
        for (var source in this._sources) {
            var src = this._sources[source];
            sources.push(new SourceViewModel(n, src));
            n++;
        }

        return sources;
    }
}

export const SourcesHelper = new Sources();