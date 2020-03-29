require('dotenv').config();
const mongoose = require('mongoose');
const cardSchema = require('../models/schemas/cardSchema');

async function populateDatabaseFromURI(sourceURI, targetURI) {
  try {
    //
    // connect to MongoDB databases.
    //
    console.log('Connecting to MongoDB databases...');
    const sourceConn = await mongoose.createConnection(sourceURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const sourceModel = sourceConn.model('Card', cardSchema);

    const targetConn = await mongoose.createConnection(targetURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const targetModel = targetConn.model('Card', cardSchema);
    console.log('MongoDB databases connected.');

    //
    // build pipelines.
    //
    const pipeline = [];
    console.log('Aggregating data from source database...');

    // match stage - filter non-playable cards.
    const match = {
      $match: {
        set_type: {
          $nin: [
            'masters',
            'masterpiece',
            'from_the_vault',
            'spellbook',
            'premium_deck ',
            'duel_deck',
            'treasure_chest',
            'planechase',
            'archenemy',
            'vanguard',
            'funny',
            'promo',
            'token',
            'memorabilia'
          ]
        },
        layout: {
          $nin: [
            'planar',
            'scheme',
            'vanguard',
            'token',
            'double_faced_token',
            'emblem',
            'augment',
            'host',
            'art_series',
            'double_sided'
          ]
        },
        multiverse_ids: {
          $ne: []
        }
      }
    };

    // group stage - filter multiple versions of cards (keep the latest print of the card).
    const group = {
      $group: {
        _id: '$oracle_id',
        artist: { $first: '$artist' },
        cmc: { $first: '$cmc' },
        card_faces: { $first: '$card_faces' },
        colors: { $first: '$colors' },
        flavor_text: { $first: '$flavor_text' },
        id: { $first: '$id' },
        image_uris: { $first: '$image_uris' },
        layout: { $first: '$layout' },
        legalities: { $first: '$legalities' },
        loyalty: { $first: '$loyalty' },
        mana_cost: { $first: '$mana_cost' },
        multiverse_ids: { $first: '$multiverse_ids' },
        name: { $first: '$name' },
        oracle_id: { $first: '$oracle_id' },
        oracle_text: { $first: '$oracle_text' },
        power: { $first: '$power' },
        rarity: { $first: '$rarity' },
        released_at: { $first: '$released_at' },
        related_uris: { $first: '$related_uris' },
        rulings_uri: { $first: '$rulings_uri' },
        scryfall_uri: { $first: '$scryfall_uri' },
        set: { $first: '$set' },
        set_name: { $first: '$set_name' },
        set_type: { $first: '$set_type' },
        toughness: { $first: '$toughness' },
        type_line: { $first: '$type_line' }
      }
    };

    // project stage - filter useless fields generated on group stage.
    const project = {
      $project: {
        _id: 0,
        'card_faces.artist_id': 0,
        'card_faces.color_indicator': 0,
        'card_faces.illustration_id': 0,
        'card_faces.image_uris.art_crop': 0,
        'card_faces.image_uris.border_crop': 0,
        'card_faces.object': 0,
        'card_faces.printed_name': 0,
        'card_faces.printed_text': 0,
        'card_faces.printed_type_line': 0,
        'card_faces.watermark': 0,
        'image_uris.art_crop': 0,
        'image_uris.border_crop': 0,
        'legalities.future': 0,
        'legalities.historic': 0,
        'legalities.penny': 0,
        'legalities.duel': 0,
        'legalities.oldschool': 0
      }
    };
    pipeline.push(match);
    pipeline.push(group);
    pipeline.push(project);

    //
    // aggregate data from source DB to insert it on target DB.
    //
    const results = await sourceModel.aggregate(pipeline);
    console.log('Aggregated data ready.');

    console.log('Inserting aggregated data into target database...');
    await targetModel.insertMany(results);

    console.log('Succeed!');
  } catch (error) {
    console.log(error);
  }
  process.exit([0]);
}

populateDatabaseFromURI(process.env.SOURCE_DB_URI, process.env.TARGET_DB_URI);
