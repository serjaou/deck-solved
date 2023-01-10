const MULTIPLE_FACED_CARD_LAYOUTS = ['adventure', 'flip', 'split', 'transform', 'art_series'];

export default function(card) {
  return MULTIPLE_FACED_CARD_LAYOUTS.includes(card.layout);
}
