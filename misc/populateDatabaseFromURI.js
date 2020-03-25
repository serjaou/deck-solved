require('dotenv').config('');
const mongoose = require('mongoose');
const cardSchema = require('../schemas/cardSchema');

async function connectToDatabases(sourceURI, targetURI) {
  let sourceModel = {};
  let targetModel = {};

  try {
    const sourceConn = await mongoose.createConnection(sourceURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    sourceModel = sourceConn.model('Card', cardSchema);
  } catch (error) {
    console.log(error);
  }
  console.log('Source MongoDB connected.');

  try {
    const targetConn = await mongoose.createConnection(targetURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    targetModel = targetConn.model('Card', cardSchema);
  } catch (error) {
    console.log(error);
  }
  console.log('Target MongoDB connected.');

  return [sourceModel, targetModel];
}

async function populateDatabaseFromURI(sourceURI, targetURI) {
  console.log('Connecting to databases...');
  const [sourceModel, targetModel] = await connectToDatabases(sourceURI, targetURI);

  console.log('Building the pipelines...');
  const pipeline = [];
  // pipeline match
  const match = {
    $match: {
      multiverse_ids: { $ne: [] }
    }
  };
  // filter duplicate cards (keep the latest version)
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
  // filter _id field generated on group stage
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

  let results = [];

  console.log('Aggregating data from source database...');
  try {
    results = await sourceModel.aggregate(pipeline);
  } catch (error) {
    console.log(error);
  }

  console.log('Inserting data into target database...');
  try {
    await targetModel.insertMany(results);
  } catch (error) {
    console.log(error);
  }

  console.log('Success!');
  process.exit([0]);
}

module.exports = populateDatabaseFromURI;
