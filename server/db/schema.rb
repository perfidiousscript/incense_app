# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_02_184849) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "brands", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "country", null: false
    t.text "description"
    t.uuid "approved_by_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["approved_by_id"], name: "index_brands_on_approved_by_id"
    t.index ["name"], name: "index_brands_on_name", unique: true
    t.index ["slug"], name: "index_brands_on_slug", unique: true
  end

  create_table "incense_statistics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "incense_id", null: false
    t.float "rating_avg"
    t.float "price_paid_avg"
    t.float "burn_time_avg"
    t.float "burn_time_sd"
    t.float "sweet_avg"
    t.float "sweet_sd"
    t.float "smokey_avg"
    t.float "smokey_sd"
    t.float "woody_avg"
    t.float "woody_sd"
    t.float "ethereal_avg"
    t.float "ethereal_sd"
    t.float "savory_avg"
    t.float "savory_sd"
    t.float "fruity_avg"
    t.float "fruity_sd"
    t.float "citrus_avg"
    t.float "citrus_sd"
    t.float "herbal_avg"
    t.float "herbal_sd"
    t.float "spicy_avg"
    t.float "spicy_sd"
    t.float "floral_avg"
    t.float "floral_sd"
    t.float "earthy_avg"
    t.float "earthy_sd"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["incense_id"], name: "index_incense_statistics_on_incense_id"
  end

  create_table "incenses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.uuid "brand_id", null: false
    t.uuid "approved_by_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["approved_by_id"], name: "index_incenses_on_approved_by_id"
    t.index ["brand_id"], name: "index_incenses_on_brand_id"
    t.index ["slug"], name: "index_incenses_on_slug", unique: true
  end

  create_table "ingredient_classifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "incense_id", null: false
    t.uuid "ingredient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["incense_id"], name: "index_ingredient_classifications_on_incense_id"
    t.index ["ingredient_id"], name: "index_ingredient_classifications_on_ingredient_id"
  end

  create_table "ingredients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["slug"], name: "index_ingredients_on_slug", unique: true
  end

  create_table "review_rankings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "review_id", null: false
    t.integer "ups", default: 0
    t.integer "downs", default: 0
    t.integer "ranking", default: 0
    t.integer "magnitude", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["review_id"], name: "index_review_rankings_on_review_id"
  end

  create_table "review_votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "review_id", null: false
    t.integer "vote_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["review_id"], name: "index_review_votes_on_review_id"
    t.index ["user_id"], name: "index_review_votes_on_user_id"
  end

  create_table "reviews", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "incense_id", null: false
    t.uuid "user_id", null: false
    t.integer "price_paid"
    t.float "rating", default: 2.0
    t.text "review_body"
    t.integer "burn_time"
    t.integer "year_purchased"
    t.float "sweet", default: 0.0, null: false
    t.float "smokey", default: 0.0, null: false
    t.float "woody", default: 0.0, null: false
    t.float "ethereal", default: 0.0, null: false
    t.float "savory", default: 0.0, null: false
    t.float "fruity", default: 0.0, null: false
    t.float "citrus", default: 0.0, null: false
    t.float "herbal", default: 0.0, null: false
    t.float "spicy", default: 0.0, null: false
    t.float "floral", default: 0.0, null: false
    t.float "earthy", default: 0.0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["incense_id"], name: "index_reviews_on_incense_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.integer "role", default: 0, null: false
    t.datetime "disabled_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "encrypted_password", limit: 128
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128
    t.string "slug"
    t.string "email_confirmation_token", default: "", null: false
    t.datetime "email_confirmed_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["remember_token"], name: "index_users_on_remember_token"
    t.index ["slug"], name: "index_users_on_slug", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "brands", "users", column: "approved_by_id"
  add_foreign_key "incense_statistics", "incenses"
  add_foreign_key "incenses", "brands"
  add_foreign_key "incenses", "users", column: "approved_by_id"
  add_foreign_key "ingredient_classifications", "incenses"
  add_foreign_key "ingredient_classifications", "ingredients"
  add_foreign_key "review_rankings", "reviews"
  add_foreign_key "review_votes", "reviews"
  add_foreign_key "review_votes", "users"
  add_foreign_key "reviews", "incenses"
  add_foreign_key "reviews", "users"
end
