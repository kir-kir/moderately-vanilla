

ServerEvents.recipes(event => {
    event.remove({ id: /^rocks:.*_from_splitter$/ });

    event.remove({ output: 'minecraft:sulfur_stairs' });

  event.shaped(Item.of('minecraft:sulfur_stairs', 4), [
    'S  ',
    'SS ',
    'SSS'
  ],
  {
    S: 'burnt_additions:sulphur_ore'
  })

  event.stonecutting('minecraft:sulfur_stairs', 'burnt_additions:sulphur_ore');

  event.remove({ output: 'minecraft:sulfur_slab' })

  event.shaped(Item.of('minecraft:sulfur_slab', 6), [
    'SSS'
  ],
{
    S: 'burnt_additions:sulphur_ore'
})
event.stonecutting('2x minecraft:sulfur_slab', 'burnt_additions:sulphur_ore');

event.remove({ output: 'minecraft:sulfur_wall' })

event.shaped(Item.of('minecraft:sulfur_wall', 6), [
    'SSS',
    'SSS'
], {
    S: 'burnt_additions:sulphur_ore'
})

event.stonecutting('minecraft:sulfur_wall', 'burnt_additions:sulphur_ore');

event.remove({ output: 'minecraft:chiseled_sulfur', type: 'minecraft:stonecutting' })

event.stonecutting('minecraft:chiseled_sulfur', 'burnt_additions:sulphur_ore')

event.remove({ output: 'minecraft:polished_sulfur' })

event.shaped(Item.of('minecraft:polished_sulfur', 4), [
    'SS',
    'SS'
], {
    S: 'burnt_additions:sulphur_ore'
})

event.stonecutting('minecraft:polished_sulfur', 'burnt_additions:sulphur_ore')

event.remove({ output: 'minecraft:polished_sulfur_stairs', input: 'minecraft:sulfur' })

event.stonecutting('minecraft:polished_sulfur_stairs', 'burnt_additions:sulphur_ore')

event.remove({ output: 'minecraft:polished_sulfur_slab', input: 'minecraft:sulfur' })

event.stonecutting('2x minecraft:polished_sulfur_slab', 'burnt_additions:sulphur_ore')

event.remove({ output: 'minecraft:polished_sulfur_wall', input: 'minecraft:sulfur' })

event.stonecutting('minecraft:polished_sulfur_wall', 'burnt_additions:sulphur_ore')

event.remove({ output: 'minecraft:potent_sulfur' })

event.shaped('minecraft:potent_sulfur', [
    'SSS',
    'SSS',
    'SSS'
], {
    S: 'burnt_additions:sulphur_ore'
})

event.remove({ id: 'sulfurnitre:gunpowder' })

  event.shapeless('minecraft:gunpowder', [
    'burnt_additions:sulphur',
    'sulfurnitre:nitre',
    'minecraft:charcoal'
  ])

event.shapeless(Item.of('burnt_additions:sulphur', 9), [
    'burnt_additions:sulphur_ore'
  ])

  event.remove({ id: 'sulfurnitre:brimsand' })
  event.remove({ id: 'sulfurnitre:reinforced_glass' })
  event.remove({ id: 'sulfurnitre:sulfur_lamp' })
  event.remove({ id: 'sulfurnitre:sulfur' })
  event.remove({ id: 'sulfurnitre:sulfur_block' })
  event.remove({ id: /^sulfurnitre:sulfur_from_/ })

  event.shapeless(Item.of('sulfurnitre:brimsand', 4), [
    'burnt_additions:sulphur',
    'burnt_additions:sulphur',
    'minecraft:sand',
    'minecraft:sand'
  ])

  event.shaped('sulfurnitre:reinforced_glass', [
    ' S ',
    'SGS',
    ' S '
  ], {
    S: 'burnt_additions:sulphur',
    G: 'minecraft:glass'
  })

  event.shaped('sulfurnitre:sulfur_lamp', [
    ' S ',
    'STS',
    ' B '
  ], {
    S: 'burnt_additions:sulphur',
    T: 'minecraft:torch',
    B: 'sulfurnitre:brimsand_brick'
  })

event.remove({ output: 'minecraft:furnace' })

event.shaped('minecraft:furnace', [
    'SSS',
    'SCS',
    'SSS'
], {
    S: '#c:cobblestones',
    C: '#minecraft:coals'
})

event.remove({ output: 'minecraft:stone_shovel' });
event.remove({ output: 'minecraft:stone_pickaxe' });
event.remove({ output: 'minecraft:stone_sword' });
event.remove({ output: 'minecraft:stone_axe' });
event.remove({ output: 'minecraft:stone_hoe' });

event.shaped('minecraft:stone_shovel', [
    'C',
    'S',
    'S'
],{
    C: '#c:stones',
    S: '#c:rods/wooden'
})

event.shaped('minecraft:stone_pickaxe', [
    'CCC',
    ' S ',
    ' S '
],{
    C: '#c:stones',
    S: '#c:rods/wooden'
})

event.shaped('minecraft:stone_sword', [
    'C',
    'C',
    'S'
],{
    C: '#c:stones',
    S: '#c:rods/wooden'
})

event.shaped('minecraft:stone_axe', [
    'CC',
    'CS',
    ' S'
],{
    C: '#c:stones',
    S: '#c:rods/wooden'
})

event.shaped('minecraft:stone_hoe', [
    'CC',
    ' S',
    ' S'
],{
    C: '#c:stones',
    S: '#c:rods/wooden'
})

let cobblestones = Ingredient.of('#c:cobblestones').getItemIds();
let stones = Ingredient.of('#c:stones').getItemIds();
let stoneBySuffix = new Map();
for (let id of Array.from(stones)) {
    if (id.includes(':')) {
        let suffix = id.substring(id.indexOf(':') + 1);
        stoneBySuffix.set(suffix, id);
    }
}
for (let cobId of Array.from(cobblestones)) {
    if (!cobId.includes(':')) continue;
    let suffix = cobId.substring(cobId.indexOf(':') + 1);
    let stoneSuffix = suffix.replace(/^cobbled_/, '');
    let stoneId = stoneBySuffix.get(stoneSuffix);
    if (!stoneId) continue;
    if (stoneId === 'minecraft:stone') continue;
    if (event.containsRecipe({ input: cobId })) {
        event.recipes.minecraft.campfire_cooking(stoneId, cobId, 0.1, 200);
    }
}

let knapDegradation = new Map();
for (let stoneId of Array.from(stones)) {
    if (!stoneId.includes(':')) continue;
    let suffix = stoneId.substring(stoneId.indexOf(':') + 1);
    let cobbleId = stoneBySuffix.has(suffix) ? null : null;
    let mod = stoneId.substring(0, stoneId.indexOf(':'));
    if (mod === 'minecraft') {
        if (stoneId === 'minecraft:stone') knapDegradation.set(stoneId, 'minecraft:cobblestone');
        else if (stoneId === 'minecraft:deepslate') knapDegradation.set(stoneId, 'minecraft:cobbled_deepslate');
        else knapDegradation.set(stoneId, 'minecraft:' + suffix);
    } else {
        let cobbleCandidate = mod + ':cobbled_' + suffix;
        if (Block.getBlock(cobbleCandidate)) knapDegradation.set(stoneId, cobbleCandidate);
    }
}
for (let cobId of Array.from(cobblestones)) {
    if (!cobId.includes(':')) continue;
    let mod = cobId.substring(0, cobId.indexOf(':'));
    if (mod === 'minecraft') {
        knapDegradation.set(cobId, 'minecraft:gravel');
    } else {
        let gravelCandidate = mod + ':' + cobId.substring(cobId.indexOf(':') + 1).replace(/^cobbled_/, '') + '_gravel';
        if (Block.getBlock(gravelCandidate)) knapDegradation.set(cobId, gravelCandidate);
    }
}

for (let id of Array.from(stones)) {
    let target = knapDegradation.get(id) || id;
    FlintRequired.addKnapping(id, target);
}
for (let id of Array.from(cobblestones)) {
    let target = knapDegradation.get(id) || id;
    FlintRequired.addKnapping(id, target);
}

FlintRequired.addKnapping('unearthed:phyllite', 'unearthed:cobbled_phyllite')

event.remove({ output: 'flintrequired:flint_knife' })
event.remove({ output: 'farmersdelight:flint_knife' })

event.shapeless('farmersdelight:flint_knife', [
    'flintrequired:flint_knife_head', 'flintrequired:plant_fiber', '#c:rods/wooden'
])

event.campfireCooking('burnt:baked_apple', 'minecraft:apple', 0.35, 200)

event.remove({ output: '#c:ingots', type: 'minecraft:smelting' })

event.remove({ output: 'alloy_smelter:forge_controller_tier1' })

event.shaped('alloy_smelter:forge_controller_tier1', [
    'BBB',
    'BFB',
    'BBB'
], {
    B: 'minecraft:bricks',
    F: 'minecraft:furnace'
})

event.shapeless('charms:charm_base', [
    'caverns_and_chasms:spinel', 'minecraft:string'
])

event.remove({ output: 'betterinventory:backpack_1' })

event.shaped('betterinventory:backpack_1', [
    ' S ',
    'WCW',
    'WWW'
], {
    S: 'minecraft:string',
    W: '#minecraft:wool',
    C: '#c:chests/wooden'
})

event.remove({ output: 'betterinventory:stack_upgrade_1' })

event.shaped('betterinventory:stack_upgrade_1', [
    'PPP',
    'ICI',
    'PPP'
], {
    P: 'minecraft:paper',
    I: 'minecraft:iron_ingot',
    C: '#c:chests/wooden'
})

event.shaped('minecraft:wooden_shovel', [
    'P',
    'S',
    'S'
], {
    P: '#minecraft:planks',
    S: '#c:rods/wooden'
})

event.remove({ output: 'betterinventory:upgrade_pickup' })

event.shaped('betterinventory:upgrade_pickup', [
    ' S ',
    'SHS',
    ' C '
], {
    S: 'minecraft:string',
    H: 'minecraft:hopper',
    C: '#c:chests/wooden'
})
})


ServerEvents.tags('item', event => {
    event.removeAllTagsFrom('minecraft:sulfur')
    event.removeAllTagsFrom('flintrequired:flint_knife')
    event.removeAllTagsFrom('sulfurnitre:sulfur_block')
    event.removeAllTagsFrom('sulfurnitre:sulfur')

    const copperItems = [
        'caverns_and_chasms:copper_shovel',
        'caverns_and_chasms:copper_pickaxe',
        'caverns_and_chasms:copper_axe',
        'caverns_and_chasms:copper_sword',
        'caverns_and_chasms:copper_hoe',
        'caverns_and_chasms:copper_helmet',
        'caverns_and_chasms:copper_chestplate',
        'caverns_and_chasms:copper_leggings',
        'caverns_and_chasms:copper_boots'
    ];

    event.removeAllTagsFrom(copperItems)
});

ServerEvents.tags('block', event => {
    event.removeAllTagsFrom('minecraft:sulfur')
    event.removeAllTagsFrom('sulfurnitre:sulfur_block')
});

// Strip mending from enchanted books and ancient books (only those two items)
function stripMendingFromStack(stack) {
    if (!stack || stack.empty) return false;
    const id = stack.id ? stack.id.toString() : '';
    if (id !== 'minecraft:enchanted_book' && id !== 'immersiveenchanting:ancient_book') return false;

    const nbt = stack.nbt;
    if (!nbt || !Array.isArray(nbt.StoredEnchantments) || nbt.StoredEnchantments.length === 0) return false;

    let changed = false;
    const filtered = nbt.StoredEnchantments.filter(e => {
        if (!e || !e.id) return true;
        if (e.id === 'minecraft:mending') {
            changed = true;
            return false;
        }
        return true;
    });

    if (!changed) return false;

    if (filtered.length === 0) {
        delete nbt.StoredEnchantments;
    } else {
        nbt.StoredEnchantments = filtered;
    }
    return true;
}

function stripMendingFromContainer(container) {
    if (!container) return;
    for (let i = 0; i < container.size; i++) {
        const stack = container.getItem(i);
        if (stripMendingFromStack(stack)) {
            container.setItem(i, stack);
        }
    }
}

PlayerEvents.loggedIn(event => {
    const player = event.player;
    if (!player) return;
    stripMendingFromContainer(player.inventory);
});

PlayerEvents.inventoryChanged(event => {
    const player = event.player;
    if (!player) return;
    stripMendingFromContainer(player.inventory);
});

PlayerEvents.respawned(event => {
    const player = event.player;
    if (!player) return;
    stripMendingFromContainer(player.inventory);
});