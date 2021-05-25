'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData,sanitizeEntity } = require('strapi-utils');

module.exports = {

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.contact.search(ctx.query);
    } else {
      entities = await strapi.services.contact.find(ctx.query);
    }
    return entities.filter((data)=>{
      if (ctx.state?.user?.id == data?.users_permissions_user?.id){
        return true;
      }
      return false;
    }).map(entity => sanitizeEntity(entity, { model: strapi.models.contact }));
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.contact.findOne({ id });
    if (ctx.state?.user?.id == entity?.users_permissions_user?.id){
      return sanitizeEntity(entity, { model: strapi.models.contact });
    }
    return;
  },

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data['users_permissions_user'] =  ctx.state.user;
      entity = await strapi.services.contact.create(data, { files });
    } else {
      const data = ctx.request.body;
      data['users_permissions_user'] = ctx.state.user;
      entity = await strapi.services.contact.create(data);
    }
    return sanitizeEntity(entity, { model: strapi.models.contact });
  },

  async update(ctx) {
    const { id } = ctx.params;
    const entity_from_id = await strapi.services.contact.findOne({ id });
    if (entity_from_id?.users_permissions_user?.id !== ctx.state.user.id) return;
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      
      entity = await strapi.services.contact.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.contact.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.contact });
  },


  async count(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.contact.search(ctx.query);
    } else {
      entities = await strapi.services.contact.find(ctx.query);
    }
    return entities.filter((data)=>{
      if (ctx.state?.user?.id == data?.users_permissions_user?.id){
        return true;
      }
      return false;
    }).map(entity => sanitizeEntity(entity, { model: strapi.models.contact })).reduce((a)=>(a+1),0);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const entity_from_id = await strapi.services.contact.findOne({ id });
    if (entity_from_id?.users_permissions_user?.id !== ctx.state.user.id) return;
    const entity = await strapi.services.contact.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.contact });
  },

};
 