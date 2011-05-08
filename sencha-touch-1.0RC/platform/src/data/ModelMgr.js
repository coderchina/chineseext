/*
 * @version Sencha 0.98
 * @ignore
 * @author Frank Cheung <frank@ajaxjs.com>
 * ---------------------请保留该段信息。-------------------------
 * 项目主页：http://code.google.com/p/chineseext/
 * 欢迎参与我们翻译的工作！详见《Sencha Touch中文化相关事宜》：
 * http://bbs.ajaxjs.com/viewthread.php?tid=2951
 *                                                JS堂翻译小组
 * ---------------------请保留该段信息。-------------------------
 */

/**
 * @author Ed Spencer
 * @class Ext.ModelMgr
 * @extends Ext.AbstractManager
 * @singleton
 * 
 * <p>
 * 创建和管理模型。
 * Creates and manages the current set of models</p>
 */
Ext.ModelMgr = new Ext.AbstractManager({
    typeName: 'mtype',
    
    /**
     * 指定Model的代理Proxy是什么，用字符串表示。默认为“ajax”。
     * The string type of the default Model Proxy. Defaults to 'ajax'
     * @property defaultProxyType
     * @type String
     */
    defaultProxyType: 'ajax',
    
    /**
     * @property associationStack
     * @type Array
     * 当定义关系之后，保存在哪里呢？就放在这个数组里面。
     * Private stack of associations that must be created once their associated model has been defined
     */
    associationStack: [],
    
    /**
     * 登记一个模型的定义。所有模型的插件会被立即启动，插件的参数就来自于model的配置项。
     * Registers a model definition. All model plugins marked with isDefault: true are bootstrapped
     * immediately, as are any addition plugins defined in the model config.
     */
    registerType: function(name, config) {
        /*
         * This function does a lot. In order, it normalizes the configured associations (see the belongsTo/hasMany if blocks)
         * then looks to see if we are extending another model, in which case it copies all of the fields, validations and 
         * associations from the superclass model. Once we have collected all of these configurations, the actual creation
         * is delegated to createFields and createAssociations. Finally we just link up a few convenience functions on the new model.
         */
        
        var PluginMgr    = Ext.PluginMgr,
            plugins      = PluginMgr.findByType('model', true),
            fields       = config.fields || [],
            associations = config.associations || [],
            belongsTo    = config.belongsTo,
            hasMany      = config.hasMany,
            extendName   = config.extend,
            modelPlugins = config.plugins || [],
            association, model, length, i,
            extendModel, extendModelProto, extendValidations, proxy;
        
        //associations can be specified in the more convenient format (e.g. not inside an 'associations' array).
        //we support that here
        if (belongsTo) {
            if (!Ext.isArray(belongsTo)) {
                belongsTo = [belongsTo];
            }
            
            for (i = 0; i < belongsTo.length; i++) {
                association = belongsTo[i];
                
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                Ext.apply(association, {type: 'belongsTo'});
                
                associations.push(association);
            }
            
            delete config.belongsTo;
        }
        
        if (hasMany) {
            if (!Ext.isArray(hasMany)) {
                hasMany = [hasMany];
            }
            
            for (i = 0; i < hasMany.length; i++) {
                association = hasMany[i];
                
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                
                Ext.apply(association, {type: 'hasMany'});
                
                associations.push(association);
            }
            
            delete config.hasMany;
        }
        
        //if we're extending another model, inject its fields, associations and validations
        if (extendName) {
        	// 现有的业务类，继承之
            extendModel       = this.types[extendName];
            extendModelProto  = extendModel.prototype;
            extendValidations = extendModelProto.validations;
            
            proxy              = extendModel.proxy;
            fields             = extendModelProto.fields.items.concat(fields);
            associations       = extendModelProto.associations.items.concat(associations);
            config.validations = extendValidations ? extendValidations.concat(config.validations) : config.validations;
        } else {
        	// 从Ext.data.Model继承，诞生全新的业务类。
            extendModel = Ext.data.Model;
            proxy = config.proxy;
        }
        // 创建新的业务类/
        model = Ext.extend(extendModel, config);
        // 初始化插件
        for (i = 0, length = modelPlugins.length; i < length; i++) {
            plugins.push(PluginMgr.create(modelPlugins[i]));
        }
        // 保存model到ModelMgr
        this.types[name] = model;
        // override方法修改prototype
        Ext.override(model, {
            plugins     : plugins,
            fields      : this.createFields(fields),
            associations: this.createAssociations(associations, name)
        });
        
        model.modelName = name;
        // 注意call()用得巧妙！
        Ext.data.Model.setProxy.call(model, proxy || this.defaultProxyType);
        model.getProxy = model.prototype.getProxy;
        // 静态方法
        model.load = function() {
            Ext.data.Model.load.apply(this, arguments);
        };
        // 启动插件
        for (i = 0, length = plugins.length; i < length; i++) {
            plugins[i].bootstrap(model, config);
        }
        
        model.defined = true;
        this.onModelDefined(model);
        
        return model;
    },
    
    /**
     * @private
     * Private callback called whenever a model has just been defined. This sets up any associations
     * that were waiting for the given model to be defined
     * @param {Function} model The model that was just created
     */
    onModelDefined: function(model) {
        var stack  = this.associationStack,
            length = stack.length,
            create = [],
            association, i;
        
        for (i = 0; i < length; i++) {
            association = stack[i];
            
            if (association.associatedModel == model.modelName) {
                create.push(association);
            }
        }
        
        length = create.length;
        for (i = 0; i < length; i++) {
            this.addAssociation(create[i], this.types[create[i].ownerModel].prototype.associations);
            stack.remove(create[i]);
        }
    },
    
    /**
     * @private
     * Creates and returns a MixedCollection representing the associations on a model
     * @param {Array} associations The array of Association configs
     * @param {String} name The string name of the owner model
     * @return {Ext.util.MixedCollection} The Mixed Collection
     */
    createAssociations: function(associations, name) {
        var length = associations.length,
            i, associationsMC, association;
        
        associationsMC = new Ext.util.MixedCollection(false, function(association) {
            return association.name;
        });
        
        for (i = 0; i < length; i++) {
            association = associations[i];
            Ext.apply(association, {
                ownerModel: name,
                associatedModel: association.model
            });
            
            if (this.types[association.model] == undefined) {
                this.associationStack.push(association);
            } else {
                this.addAssociation(association, associationsMC);
            }
        }
        
        return associationsMC;
    },
    
    /**
     * @private
     * Creates an Association based on config and the supplied MixedCollection. TODO: this will
     * probably need to be refactored into a more elegant solution - it was initially pulled out
     * to support deferred Association creation when the associated model has not been defined yet.
     */
    addAssociation: function(association, associationsMC) {
        var type = association.type;
        
        if (type == 'belongsTo') {
            associationsMC.add(new Ext.data.BelongsToAssociation(association));
        }
        
        if (type == 'hasMany') {
            associationsMC.add(new Ext.data.HasManyAssociation(association));
        }
        
        if (type == 'polymorphic') {
            associationsMC.add(new Ext.data.PolymorphicAssociation(association));
        }
    },
    
    /**
     * @private
     * Creates and returns a MixedCollection representing the fields in a model
     * @param {Array} fields The array of field configurations
     * @return {Ext.util.MixedCollection} The Mixed Collection
     */
    createFields: function(fields) {
        var length = fields.length,
            i, fieldsMC;
        
        fieldsMC = new Ext.util.MixedCollection(false, function(field) {
            return field.name;
        });
        
        for (i = 0; i < length; i++) {
            fieldsMC.add(new Ext.data.Field(fields[i]));
        }
        
        return fieldsMC;
    },
    
    /**
     * 根据id返回{@link Ext.data.Model}
     * Returns the {@link Ext.data.Model} for a given model name
     * @param {String/Object} id The id of the model or the model instance.
     */
    getModel: function(id) {
        var model = id;
        if (typeof model == 'string') {
            model = this.types[model];
        }
        return model;
    },
    
    create: function(config, name) {
        var con = typeof name == 'function' ? name : this.types[name || config.name];
        
        return new con(config);
    }
});

/**
 * Shorthand for {@link Ext.ModelMgr#registerType}
 * Creates a new Model class from the specified config object. See {@link Ext.data.Model} for full examples.
 * 
 * @param {Object} config A configuration object for the Model you wish to create.
 * @return {Ext.data.Model} The newly registered Model
 * @member Ext
 * @method regModel
 */
Ext.regModel = function() {
    return Ext.ModelMgr.registerType.apply(Ext.ModelMgr, arguments);
};